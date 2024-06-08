import { cn } from "@/lib/utils";
import { Sidebar } from "./_components/sidebar";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='min-h-screen bg-[#fcfcff] overflow-visible'>
			{/* <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div> */}
			<div className={cn("flex w-full flex-row flex-nowrap")}>
				<div
					className={cn(
						"hidden md:flex basis-[320px] min-w-[320px] flex-col inset-y-0 z-50 sticky top-0"
					)}>
					<div className='h-screen sticky top-0'>
						{/* BEGIN: Sidebar container */}
						<div className='p-5 h-full'>
							<Sidebar />
						</div>
						{/* END: Sidebar container */}
					</div>
				</div>
				<main className={cn("min-h-screen grow")}>{children}</main>
			</div>
		</div>
	);
};

export default DashboardLayout;
