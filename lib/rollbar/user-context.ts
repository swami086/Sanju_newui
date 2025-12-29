export function setRollbarPerson(rollbar: any, user: any) {
    if (user) {
        rollbar.configure({
            payload: {
                person: {
                    id: user.id,
                    email: user.email,
                    username: user.user_metadata?.full_name || user.email,
                },
            },
        });
    } else {
        rollbar.configure({
            payload: {
                person: null,
            },
        });
    }
}
