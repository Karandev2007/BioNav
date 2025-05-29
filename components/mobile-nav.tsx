import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/sidebar";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex h-14 w-full items-center gap-2 bg-background px-4 hover:bg-accent">
          <Menu className="h-6 w-6" />
          <span className="font-bold">Menu</span>
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
} 