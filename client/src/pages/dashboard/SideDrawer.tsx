import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

const SideDrawer = ({open,onOpenChange}:{open:boolean;onOpenChange:(x:boolean)=>void}) => {
  return (
    <div className="block sm1:hidden">
      <Drawer direction={`left`} open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="bg-[#171717] border border-[#333333] text-white">
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SideDrawer;
