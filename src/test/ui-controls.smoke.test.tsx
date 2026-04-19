import React from "react";
import { render, screen } from "@testing-library/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

describe("shared ui controls", () => {
  it("renders common inputs and buttons", () => {
    render(
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="name@example.com" />
        <Textarea placeholder="Write something" />
        <Button>Submit</Button>
        <Checkbox aria-label="accept terms" />
        <Switch aria-label="notifications" />
      </div>
    );

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
    expect(screen.getByLabelText("accept terms")).toBeInTheDocument();
    expect(screen.getByLabelText("notifications")).toBeInTheDocument();
  });

  it("renders layout and feedback primitives", () => {
    render(
      <div>
        <Badge>New</Badge>
        <Alert>
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>Everything is mocked safely.</AlertDescription>
        </Alert>
        <Card>
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <CardDescription>Card description</CardDescription>
          </CardHeader>
          <CardContent>Card body</CardContent>
          <CardFooter>Card footer</CardFooter>
        </Card>
        <Progress value={40} />
        <Separator />
      </div>
    );

    expect(screen.getByText("New")).toBeInTheDocument();
    expect(screen.getByText("Heads up")).toBeInTheDocument();
    expect(screen.getByText("Card title")).toBeInTheDocument();
  });

  it("renders accordion, tabs, dialog, and tooltip primitives", () => {
    render(
      <TooltipProvider>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Open section</AccordionTrigger>
            <AccordionContent>Accordion content</AccordionContent>
          </AccordionItem>
        </Accordion>

        <Tabs defaultValue="one">
          <TabsList>
            <TabsTrigger value="one">One</TabsTrigger>
            <TabsTrigger value="two">Two</TabsTrigger>
          </TabsList>
          <TabsContent value="one">Tab one content</TabsContent>
          <TabsContent value="two">Tab two content</TabsContent>
        </Tabs>

        <Dialog defaultOpen>
          <DialogTrigger asChild>
            <Button>Open dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Dialog title</DialogTitle>
          </DialogContent>
        </Dialog>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button>Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>Helpful tip</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    expect(screen.getByText("Open section")).toBeInTheDocument();
    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.getByText("Dialog title")).toBeInTheDocument();
    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });
});
