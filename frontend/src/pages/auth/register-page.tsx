import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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

const registerSchema = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  email: z.email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

const RegisterPage = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  function onSubmit(data: z.infer<typeof registerSchema>) {
    setLoading(true);
    api
      .post("/register", data)
      .then(() => {
        setLoading(false);
        toast.success("Account has been created successfully!");
        navigate("/login");
      })
      .catch(() => {
        setLoading(false);
        toast.error("Something went wrong. Try again");
      });
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
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <InputGroup>
                        <InputGroupInput disabled={loading} {...field} />
                        <InputGroupAddon>
                          <Mail />
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <InputGroup>
                        <InputGroupInput
                          disabled={loading}
                          type="password"
                          {...field}
                        />
                        <InputGroupAddon>
                          <Lock />
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full mt-2" isLoading={loading}>
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
