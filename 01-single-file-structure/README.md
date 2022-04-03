# Read all

    {
        users {
            id
            username
            name
        }
    }

# Create

    mutation {
        addUser(username: "manolin", name: "Manolo Sanchez") {
            id
            username
            name
        }
    }

    mutation {
        addUser(username: "joselin001", name: "Jose panfilo") {
            id
            username
            name
            affected_rows
        }
    }

    mutation {
        addUser(username: "kika001", name: "Erika Lopez") {
            id
            username
            name
            affected_rows
        }
    }

muta

# Read by Id

    {
        user(id: 0) {
            id
            username
        }
        user(id: 2) {
            username
            name
        }
    }

# Update by Id

    mutation {
        updateUser(id: 0, username: "Ricky riquín", name: "Ricardo") {
            id
            username
            name
        }
    }

# Delete by Id

    mutation {
        deleteUser(id: 1) {
            id
        }
    }
