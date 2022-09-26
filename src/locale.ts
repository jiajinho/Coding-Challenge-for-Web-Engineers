export default {
  login: {
    title: "Web Engineer Coding Challenge",
    form: {
      email: "Email",
      password: "Password",
      submit: "Login"
    },
    success: "Login successful"
  },

  dashboard: {
    header: {
      logout: "Logout"
    },
    toolbar: {
      title: "Product List",
      addButton: "Add"
    },
    emptyProduct: {
      title: "Product list is empty!",
      subtitle: "Try adding one by clicking the add button above."
    },
    deleteModal: {
      title: "Delete #{{ 1 }}?",
      confirmation: "Are you sure you want to delete {{ 1 }}?",
      submit: "Delete",
      cancel: "Cancel",
      success: "#{{ 1 }} deleted."
    },
    upsertModal: {
      title: {
        add: "Add an item",
        edit: "Edit #{{ 1 }}"
      },
      form: {
        sku: "SKU",
        title: "Title",
        description: "Description",
        submit: "Submit",
        reset: "Reset"
      },
      success: {
        add: "Item added successfully",
        edit: "Item updated successfully"
      }
    }
  },

  404: {
    title: "404 Not Found",
    subtitle: "Whoops! That page doesn't exist.",
    countdown: "You will be redirected back to previous page in {{ 1 }} seconds."
  },

  validation: {
    emptyField: "Field is required",
    notInEmailFormat: "Field must be in email format"
  }
}