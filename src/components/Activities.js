

const Activities = ({activities}) => {
    console.log(activities)
    return <div>

        {activities?.map(activity => {
            return <div key={activity.id}>
                <h3>Name: {activity.name}</h3>
                <h3>Description: {activity.description}</h3>
            </div>
        })}
    
    </div>

}

export default Activities;