import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Form, FormFieldWrapper } from "@/components/ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, User as UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import useApi from "@/hooks/use-api";
import type { User } from "@/providers/auth-provider";
import * as React from "react";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

type LoginSchema = z.infer<typeof loginSchema>;

const loginFetcher = (url: string, body?: LoginSchema) => api.post(url, body);

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const {
    data,
    isLoading,
    error,
    execute: submitForm,
  } = useApi<User, LoginSchema>("/login", loginFetcher);

  React.useEffect(() => {
    if (data) {
      setUser(data);
      toast.success("You've logged in successfully!");
      navigate("/dashboard");
    } else if (error) {
      toast.error("Something went wrong. Try again");
    }
  }, [data, error, setUser, navigate]);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginSchema) {
    await submitForm(data);
  }

  return (
    <>
      <Card className="w-md mx-3 sm:mx-auto" variant="light">
        <CardHeader>
          <div className="text-center">
            <h4>Login</h4>
            <p className="mt-2 text-muted-foreground">
              Enter your credentials to continue
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormFieldWrapper<LoginSchema>
                control={form.control}
                formField={{
                  name: "email",
                  label: "Email",
                  render: (field) => {
                    return (
                      <InputGroup>
                        <InputGroupInput disabled={isLoading} {...field} />
                        <InputGroupAddon>
                          <UserIcon />
                        </InputGroupAddon>
                      </InputGroup>
                    );
                  },
                }}
              />
              <FormFieldWrapper<LoginSchema>
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
              <Button
                className="w-full mt-2"
                variant="outline"
                isLoading={isLoading}
              >
                Sign in
              </Button>
            </form>
          </Form>
          <CardFooter className="mt-5">
            <div className="mx-auto">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Register
              </Link>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </>
  );
};

export default LoginPage;
