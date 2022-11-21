import { useState } from 'react';

const Contact = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        msg: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('/api/mail', {
            method: 'POST',
            body: JSON.stringify({
                name: form.name,
                email: form.email,
                msg: form.msg,
            }),
        })
            .then((res) => {
                console.log('Response received');
                if (res.status === 200) {
                    console.log('Response succeeded!');
                    alert('お問い合わせを受け付けました！返信までしばらくお待ちください。')
                } else {
                    console.log(`Error: Status Code ${res.status}`);
                }
            })
            .catch((e) => {
                console.log(`Error: ${e}`);
            });
    };

    return (
        <form>
            <input
                onChange={(e) => {
                    const val = e.currentTarget.value;
                    setForm((props) => ({
                        ...props,
                        name: val !== null ? val : '',
                    }));
                }}
                value={form.name}
                name="name"
                type="text"
                className="feedback-input"
                placeholder="Name"
            />
            <input
                onChange={(e) => {
                    const val = e.currentTarget.value;
                    setForm((props) => ({
                        ...props,
                        email: val !== null ? val : '',
                    }));
                }}
                name="email"
                type="text"
                className="feedback-input"
                placeholder="Email"
            />
            <textarea
                onChange={(e) => {
                    const val = e.currentTarget.value;
                    setForm((props) => ({
                        ...props,
                        msg: val !== null ? val : '',
                    }));
                }}
                name="text"
                className="feedback-input"
                placeholder="Comment"
            ></textarea>
            <input
                onClick={async (e) => {
                    await handleSubmit(e);
                }}
                type="submit"
                value="SUBMIT"
            />
        </form>
    );
};

export default Contact;