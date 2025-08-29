import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { CreateIncidentFormData } from "@/lib/validations";
import type { ApiError } from "@/api/incidents";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { createIncidentSchema } from "@/lib/validations";
import { incidentsApi } from "@/api/incidents";
import { INCIDENT_TYPES } from "@/types/incident";

interface IncidentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function IncidentForm({ onSuccess, onCancel }: IncidentFormProps) {
  const queryClient = useQueryClient();
  
  const form = useForm<CreateIncidentFormData>({
    resolver: zodResolver(createIncidentSchema),
    defaultValues: {
      title: "",
      description: "",
      incident_type: undefined,
      location: "",
      image: "",
    },
  });

  const createIncidentMutation = useMutation({
    mutationFn: incidentsApi.create,
    onSuccess: () => {
      // Invalidate incidents list to refetch data
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
      
      toast.success("Incident created successfully!");
      form.reset();
      onSuccess?.();
    },
    onError: (error: ApiError) => {
      console.error("Error creating incident:", error);
      
      if (error.status === 400 && error.errors) {
        // Handle validation errors from backend
        toast.error("Please check your input and try again.");
      } else {
        toast.error(error.message || "Failed to create incident. Please try again.");
      }
    },
  });

  const onSubmit = (data: CreateIncidentFormData) => {
    // Clean up empty strings to undefined for optional fields
    const cleanedData = {
      ...data,
      description: data.description?.trim() || undefined,
      location: data.location?.trim() || undefined,
      image: data.image?.trim() || undefined,
    };
    
    createIncidentMutation.mutate(cleanedData);
  };

  const isLoading = createIncidentMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter incident title"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="incident_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Incident Type *</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select incident type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {INCIDENT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the incident (optional)"
                  className="min-h-[100px]"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter location (optional)"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  placeholder="Image URL or file path (optional)"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-3 pt-4">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Incident"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
