import { useState } from "react";
import api from "../services/api";

export default function TestConnection() {

    const [message, setMessage] = useState("");

    async function testAPI() {

        try {

            const response = await api.get("/");

            setMessage(response.data.message);

        }

        catch {

            setMessage("Connection Failed");

        }

    }

    return (

        <div>

            <button onClick={testAPI}>

                Test Backend

            </button>

            <h3>{message}</h3>

        </div>

    );

}