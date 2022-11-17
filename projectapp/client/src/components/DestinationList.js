import React from 'react';
import './css/betastyle.css';

const DestinationList = (props) => {

	if (!props.destinations.length) {
		return <h3>{props.message} No destination entered</h3>;
	}

	return (
		<div className="">
			<h3>{props.title}</h3>
			{props.destinations &&
				props.destinations.map((destination) => (
					<div key={destination._id} className="mb-3 destinationCard">
						<h3 className=" p-2 m-0 card-header">
							{destination.destinationTitle} <br />
							<span style={{ fontSize: '0.8rem' }}>
								{destination.createdAt}
							</span>
						</h3>
						<div className="  p-2">
							<p>{destination.description}</p>
						</div>
						<div className="  p-2">
							<div className="polaroid-container">
								<img src={destination.imageUrl} className="pure-img polaroid rotate10" />
							</div>
						</div>
					</div>
				))}
		</div>
	);
};

export default DestinationList;
