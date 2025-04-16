
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardReportProps {
  title: string;
  children?: ReactNode;
  className?: string;
}

export function CardReport({ title, children, className = "" }: CardReportProps) {
  return (
    <Card className={`border-2 border-jetson-gold hover:shadow-md transition-shadow ${className}`}>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-base font-medium text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        {children}
      </CardContent>
    </Card>
  );
}
