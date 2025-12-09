import Link from 'next/link';
import { Button } from "@/components/ui/button"; 
import { Package } from 'lucide-react'; 

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4"> 
      <Card className="w-[400px] shadow-lg">
        <CardHeader>
          <CardTitle>Sistema All4Pets</CardTitle>
          <CardDescription>Bem-vindo ao sistema de gerenciamento.</CardDescription>
        </CardHeader>
        <CardContent>
        </CardContent>
        <CardFooter className="flex justify-center">
        </CardFooter>
      </Card>
    </main>

  );
}