import Image from "next/image";

export const Logo = () => {
	return (
		<>
			<div className='lg:hidden h-[40px] w-[40px] rounded-full mx-auto'>
				<Image
					height={40}
					width={40}
					alt='logo'
					src='/fav-logo.png'
					className='rounded-full'
				/>
			</div>
			<div className='hidden lg:block'>
				<Image height={130} width={130} alt='logo' src='/logo.png' />
			</div>
		</>
	);
};
