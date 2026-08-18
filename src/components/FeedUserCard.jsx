
const FeedUserCard = ({ data }) => {

  const { firstName, lastName, photoUrl, description, gender } = data

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          src={photoUrl}
          alt="Photo" />
      </figure>
      <div className="card-body">
        <div className="flex items-center">
          <h2 className="card-title">
            {firstName + " " + lastName}
            {gender && <span className="badge badge-sm badge-soft badge-accent">{gender}</span>}
          </h2>
        </div>

        <p>{description}</p>
        <div className="card-actions justify-between mt-6">
          <button className="btn btn-secondary">Ignore</button>
          <button className="btn btn-primary">Send Request</button>
        </div>
      </div>
    </div>
  )
}

export default FeedUserCard