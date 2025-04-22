import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  model: z.string().min(1, "Please select a model"),
  maxCompletedRequests: z.number().min(1, "Must be at least 1"),
  requestIntervalGeneratorType: z.enum(["gamma", "poisson", "uniform"]),
  requestLengthGeneratorType: z.enum(["zipf", "uniform", "fixed"]),
  maxTokens: z.number().min(1, "Must be at least 1"),
});

type BenchmarkFormValues = z.infer<typeof formSchema>;

interface BenchmarkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: BenchmarkFormValues) => void;
}

const BenchmarkModal = ({ open, onOpenChange, onSubmit }: BenchmarkModalProps) => {
  const form = useForm<BenchmarkFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: "meta-llama/Llama-3.2-1B-Instruct",
      maxCompletedRequests: 20,
      requestIntervalGeneratorType: "gamma",
      requestLengthGeneratorType: "zipf",
      maxTokens: 8192,
    },
  });

  const handleSubmit = (values: BenchmarkFormValues) => {
    onSubmit(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Run LLM Benchmark</DialogTitle>
          <DialogDescription>
            Configure the benchmark parameters below to evaluate LLM performance.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="meta-llama/Llama-3.2-1B-Instruct">
                        Llama 3.2 1B Instruct
                      </SelectItem>
                      {/* Add more models here */}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxCompletedRequests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Completed Requests</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                      min={1}
                      placeholder="Enter max completed requests"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requestIntervalGeneratorType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Request Interval Generator Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select generator type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="gamma">Gamma</SelectItem>
                      <SelectItem value="poisson">Poisson</SelectItem>
                      <SelectItem value="uniform">Uniform</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requestLengthGeneratorType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Request Length Generator Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select generator type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="zipf">Zipf</SelectItem>
                      <SelectItem value="uniform">Uniform</SelectItem>
                      <SelectItem value="fixed">Fixed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxTokens"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Tokens</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                      min={1}
                      placeholder="Enter max tokens"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-jetson-blue to-jetson-purple hover:opacity-90"
              >
                Start Benchmark
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BenchmarkModal;