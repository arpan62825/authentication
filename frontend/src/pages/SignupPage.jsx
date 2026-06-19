import { Check } from "lucide-react";
import {
  Button,
  Description,
  FieldError,
  Input,
  Label,
  Form,
  TextField,
} from "@heroui/react";

import axiosInstance from "../lib/axios";

const SignupPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};

    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      axiosInstance.post("/auth/signup", data);
      e.currentTarget.reset();
    } catch (error) {
      console.log(
        `An error occurred while trying to send request to '/api/auth/signup': ${error}`,
      );
    }

    // alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`);
  };
  return (
    <div className="flex justify-center items-center h-full">
      <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
        {/* //USER-NAME---------------------------- */}
        <TextField
          isRequired
          maxLength={64}
          name="name"
          type="name"
          validate={(value) => {
            if (value.length > 64) {
              return "Please enter your name using 64 characters or less";
            }

            return null;
          }}
        >
          <Label className="text-white">Your Name</Label>
          <Input placeholder="Enter your fullname" />
          <FieldError />
        </TextField>
        {/* //EMAIL----------------------------- */}
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }

            return null;
          }}
        >
          <Label className="text-white">Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>
        {/* //PASSWORD------------------------- */}
        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }

            return null;
          }}
        >
          <Label className="text-white">Password</Label>
          <Input placeholder="Enter your password" />
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>
        <div className="flex gap-2">
          <Button type="submit">
            <Check />
            Submit
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignupPage;
