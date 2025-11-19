import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Form, FormFieldWrapper } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { api } from "@/lib/axios";
import * as React from "react";
import { toast } from "sonner";
import type { User } from "@/providers/auth-provider";
import useApi from "@/hooks/use-api";

const registerSchema = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  email: z.email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

type RegisterSchema = z.infer<typeof registerSchema>;

const registerFetcher = (url: string, body?: RegisterSchema) =>
  api.post(url, body);

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    data,
    isLoading,
    error,
    execute: submitForm,
  } = useApi<User, RegisterSchema>("/register", registerFetcher);

  React.useEffect(() => {
    if (data) {
      toast.success("Account has been created successfully!");
      navigate("/login");
    } else if (error) {
      toast.error("Something went wrong. Try again");
    }
  }, [data, error, navigate]);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterSchema) {
    await submitForm(data);
  }

  return (
    <>
      <Card className="w-md mx-3 sm:mx-auto" variant="light">
        <CardHeader>
          <div className="text-center">
            <h4>Sign up</h4>
            <p className="mt-2 text-muted-foreground">
              Fill fields below to create an account
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormFieldWrapper
                control={form.control}
                formField={{
                  name: "firstname",
                  label: "First name",
                  render: (field) => {
                    return <Input disabled={isLoading} {...field} />;
                  },
                }}
              />
              <FormFieldWrapper
                control={form.control}
                formField={{
                  name: "lastname",
                  label: "Last name",
                  render: (field) => {
                    return <Input disabled={isLoading} {...field} />;
                  },
                }}
              />
              <FormFieldWrapper
                control={form.control}
                formField={{
                  name: "email",
                  label: "Email",
                  render: (field) => {
                    return (
                      <InputGroup>
                        <InputGroupInput disabled={isLoading} {...field} />
                        <InputGroupAddon>
                          <Mail />
                        </InputGroupAddon>
                      </InputGroup>
                    );
                  },
                }}
              />
              <FormFieldWrapper
                control={form.control}
                formField={{
                  name: "password",
                  label: "Password",
                  render: (field) => {
                    return (
                      <InputGroup>
                        <InputGroupInput
                          type="password"
                          disabled={isLoading}
                          {...field}
                        />
                        <InputGroupAddon>
                          <Lock />
                        </InputGroupAddon>
                      </InputGroup>
                    );
                  },
                }}
              />
              <Button className="w-full mt-2" isLoading={isLoading}>
                Sign up
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="mx-auto">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default RegisterPage;
