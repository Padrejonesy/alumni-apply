import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TutorApplicationPage } from "@/components/TutorApplicationPage";
import { renderWithRouter } from "./test-utils";

describe("TutorApplicationPage validations", () => {
  it("keeps only digits in the phone field", async () => {
    renderWithRouter(<TutorApplicationPage />);

    const phoneInput = screen.getByLabelText(/phone/i);
    fireEvent.change(phoneInput, { target: { value: "abc123-45(67)890xyz" } });

    expect(phoneInput).toHaveValue("1234567890");
  });

  it("clears invalid high school entries on blur and preserves valid listed values", async () => {
    renderWithRouter(<TutorApplicationPage />);

    const highSchoolInput = screen.getByLabelText(/high school attended/i);

    fireEvent.change(highSchoolInput, { target: { value: "Fake Academy" } });
    fireEvent.blur(highSchoolInput);
    expect(highSchoolInput).toHaveValue("");

    fireEvent.change(highSchoolInput, { target: { value: "Darien High School" } });
    fireEvent.blur(highSchoolInput);
    expect(highSchoolInput).toHaveValue("Darien High School");
  });

  it("blocks decimal AP counts at the input level", async () => {
    const user = userEvent.setup();
    renderWithRouter(<TutorApplicationPage />);

    const apCountInput = screen.getByLabelText(/number of ap 5's earned/i);
    await user.type(apCountInput, "2.5");

    expect(apCountInput).not.toHaveValue("2.5");
  });

  it("shows both word and character counts for About Yourself", async () => {
    const user = userEvent.setup();
    renderWithRouter(<TutorApplicationPage />);

    const bioInput = screen.getByLabelText(/about yourself/i);
    await user.type(bioInput, "hello world");

    expect(
      screen.getByText((_, element) =>
        element?.textContent === "2/50 words minimum · 11/3000 characters"
      )
    ).toBeInTheDocument();
  });

  it("exposes stricter name and phone constraints on the form controls", () => {
    renderWithRouter(<TutorApplicationPage />);

    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const phoneInput = screen.getByLabelText(/phone/i);

    expect(firstNameInput).toHaveAttribute("minlength", "2");
    expect(firstNameInput).toHaveAttribute("maxlength", "50");
    expect(lastNameInput).toHaveAttribute("minlength", "2");
    expect(phoneInput).toHaveAttribute("maxlength", "15");
    expect(phoneInput).toHaveAttribute("inputmode", "numeric");
  });
});
