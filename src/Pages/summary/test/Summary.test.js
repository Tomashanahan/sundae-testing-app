import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

describe("Checkbox shoud start as unchecked", () => {
	it("checkbox starts unchecked and button disabled", () => {
		render(<SummaryForm />);
		const checkbox = screen.getByRole("checkbox", {
			name: /terms and conditions/i,
		});
		const confirmButton = screen.getByRole("button", { name: "Confirm order" });

		expect(checkbox).not.toBeChecked();
		expect(confirmButton).toBeDisabled();
	});

	it("Toggle disable/enable button when clicks checkbox", async () => {
		render(<SummaryForm />);
		const user = userEvent.setup();
		const checkbox = screen.getByRole("checkbox", {
			name: /terms and conditions/i,
		});
		const confirmButton = screen.getByRole("button", {
			name: /confirm order/i,
		});

		// Checking if the button is enable after a checking the checkbox
		await user.click(checkbox);
		expect(confirmButton).toBeEnabled();

		// Unchecking the checkbox
		await user.click(checkbox);
		expect(confirmButton).toBeDisabled();
	});

	it("popover responds to hover", async () => {
		render(<SummaryForm />);
		const user = userEvent.setup();
		const nullPopOver = screen.queryByText(
			/no ice cream will actually be delivered/i
		);
		const termsAndConditions = screen.getByText(/terms and conditions/i);

		//  popover starts out hidden
		expect(nullPopOver).not.toBeInTheDocument();

		//  popover appears on mouse over of checkbox label
		await user.hover(termsAndConditions);
		// i am searching again the elemento because after hover the element shoul apear
		const popOver = screen.getByText(
			/no ice cream will actually be delivered/i
		);
		expect(popOver).toBeInTheDocument();

		//  popover desapires when we mouse out
		await user.unhover(termsAndConditions);
		expect(popOver).not.toBeInTheDocument();
	});
});
