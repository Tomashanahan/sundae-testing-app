import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

function SummaryForm() {
	const [termsAndCondCheked, setTermsAndCondCheked] = useState(false);

	const popover = (
		<Popover id="popover-basic">
			<Popover.Body>No ice cream will actually be delivered</Popover.Body>
		</Popover>
	);

	const checkBoxLabel = (
		<span>
			I agree to{" "}
			<OverlayTrigger placement="right" overlay={popover}>
				<span style={{ color: "blue" }}>
					Terms and Conditions
				</span>
			</OverlayTrigger>
		</span>
	);

	return (
		<Form>
			<Form.Group controlId="terms-and-conditions">
				<Form.Check
					type="checkbox"
					checked={termsAndCondCheked}
					onChange={(e) => {
						setTermsAndCondCheked(!termsAndCondCheked);
					}}
					label={checkBoxLabel}
				/>
			</Form.Group>
			<Button variant="primary" type="submit" disabled={!termsAndCondCheked}>
				Confirm order
			</Button>
		</Form>
	);
}

export default SummaryForm;

