try {
    if (roleCode === 1) {
        await axios.post("/user-role", {
            user_id: selectedUser.id,
            role_id: 1,
        });
    } else if (roleCode === 2) {
        await axios.post("/user-role", {
            user_id: selectedUser.id,
            role_id: 1,
        });
        await axios.post("/user-role", {
            user_id: selectedUser.id,
            role_id: 2,
        });
    } else if (roleCode === 0) {
        await axios.delete("/user-role", {
            user_id: selectedUser.id,
        });
    }
} catch (error) {
    console.log(error.response);
} finally {
    setUpdatingUser(false);
    setIsLoading(false);
}
