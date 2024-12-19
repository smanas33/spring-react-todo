import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { retrieveAllTodosForUserName} from './api/TodoApiService'
import { retrieveHelloWorldBean} from './api/HelloWorldRestApiService'
import { useAuth } from './security/AuthContext'

function WelcomeComponent() {
    const {username} = useParams()
    const [ message, setMessage ] = useState(null)
    const authContext = useAuth()

    return (
        <div className="WelcomeComponent">
            <h1>Welcome { username } !!</h1>
            <div>
                Manage Your Todos - <Link to="/todos"> Go Here </Link>
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>Hello World</button>
            </div>
            <div className="text-info">{ message }</div>
        </div>
    )

    function callHelloWorldRestApi() {
        retrieveHelloWorldBean('Manas', authContext.token)
        .then((response) => successfulResponse(response))
        .catch((error)   => errorResponse(error))
        .finally(() => console.log('cleanup'))
    }

    function successfulResponse(response) {
        console.log(response)
        setMessage(response.data.message)
    }

    function errorResponse(error) {
        console.log(error)
    }
}

export default WelcomeComponent