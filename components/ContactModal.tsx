"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";

function ContactModal() {
	const [openModal, setOpenModal] = useState(false);
	const [email, setEmail] = useState("");

	function onCloseModal() {
		setOpenModal(false);
		setEmail("");
	}

	return (
		<>
			<button onClick={() => setOpenModal(true)}>Contact Us</button>
			<Modal
				show={openModal}
				size="md"
				onClose={onCloseModal}
				popup
			>
				<Modal.Header />
				<Modal.Body>
					<div className="space-y-6">
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">
							Kindly Fill In the Form
						</h3>
						<div>
							<div className="mb-2 block">
								<Label
									htmlFor="email"
									value="Your email"
								/>
							</div>
							<TextInput
								id="email"
								placeholder="name@company.com"
								value={email}
								onChange={(event) => setEmail(event.target.value)}
								required
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label
									htmlFor="Numer"
									value="Your Number"
								/>
							</div>
							<TextInput
								id="number"
                                type="text"
                                placeholder="+12345678"
								required
							/>
						</div>
						
						<div className="w-full">
							<Button>Click to Contact</Button>
						</div>
						
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}


export default ContactModal