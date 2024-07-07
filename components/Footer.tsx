import {
	Footer,
	FooterCopyright,
	FooterDivider,
	FooterIcon,
	FooterLink,
	FooterLinkGroup,
	FooterTitle,
} from "flowbite-react";
import {
	BsDribbble,
	BsFacebook,
	BsGithub,
	BsInstagram,
	BsTwitter,
} from "react-icons/bs";


export default function MyFooter() {
	return (
		<Footer
			container
			className=" bg-slate-50"
		>
			<div className="w-full">
				<div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
					<div>
						<h1 className="text-3xl font-bold text-slate-800 pb-6">Logo</h1>
					</div>
					<div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
						<div>
							<FooterTitle title="about" />
							<FooterLinkGroup col>
								<FooterLink href="#">Featured</FooterLink>
								<FooterLink href="#">Contact Us</FooterLink>
							</FooterLinkGroup>
						</div>
						<div>
							<FooterTitle title="Follow us" />
							<FooterLinkGroup col>
								<FooterLink href="#">Github</FooterLink>
								<FooterLink href="#">Discord</FooterLink>
							</FooterLinkGroup>
						</div>
						<div>
							<FooterTitle title="Legal" />
							<FooterLinkGroup col>
								<FooterLink href="#">Privacy Policy</FooterLink>
								<FooterLink href="#">Terms &amp; Conditions</FooterLink>
							</FooterLinkGroup>
						</div>
					</div>
				</div>
				<FooterDivider />
				<div className="w-full sm:flex sm:items-center sm:justify-between">
					<FooterCopyright
						href="#"
						by="Tech Voice™"
						year={2022}
					/>
					<div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
						<FooterIcon
							href="#"
							icon={BsFacebook}
						/>
						<FooterIcon
							href="#"
							icon={BsInstagram}
						/>
						<FooterIcon
							href="#"
							icon={BsTwitter}
						/>
						<FooterIcon
							href="#"
							icon={BsGithub}
						/>
						<FooterIcon
							href="#"
							icon={BsDribbble}
						/>
					</div>
				</div>
			</div>
		</Footer>
	);
}
