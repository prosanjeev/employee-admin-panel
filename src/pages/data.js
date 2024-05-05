export const employeeInformation = [
    {
      label: "Name",
      name: "fullName",
      type: "text",
    },
    {
      label: "Email",
      name: "email",
      type: "text",
    },
    {
      label: "Mobile No",
      name: "phone",
      type: "number",
    },
    {
      label: "Designation",
      name: "designation",
      type: "select",
      options: ["HR", "Manager", "Sales"],
      placeholder: "Select Designation",
    },
    {
      label: "Gender",
      name: "gender",
      type: "radio",
      options: ["male", "female"],
    },
    {
      label: "Course",
      name: "course",
      type: "checkbox",
      options: ["MCA", "BCA", "BSC"],
    },
    {
      label: "Employee Photo",
      name: "profilePhoto",
      type: "file",
    },
  ];