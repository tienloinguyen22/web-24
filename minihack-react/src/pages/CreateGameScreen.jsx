import React from 'react';

class CreateGameScreen extends React.Component {
	render() {
    console.log(this.props.history);
		return (
			<div className="container">
				<div className="row mt-4">
					<div className="col-12">
						<h2>Score Keeper</h2>
					</div>
				</div>

				<div className="row">
					<div className="col-12">
						<form id="create-game-form">
							<div className="form-group">
								<input
									type="text"
									className="form-control"
									id="player1"
									name="player1"
									placeholder="Enter player name ..."
									required
								/>
							</div>
							<div className="form-group">
								<input
									type="text"
									className="form-control"
									id="player2"
									name="player2"
									placeholder="Enter player name ..."
									required
								/>
							</div>
							<div className="form-group">
								<input
									type="text"
									className="form-control"
									id="player3"
									name="player3"
									placeholder="Enter player name ..."
									required
								/>
							</div>
							<div className="form-group">
								<input
									type="text"
									className="form-control"
									id="player4"
									name="player4"
									placeholder="Enter player name ..."
									required
								/>
							</div>

							<button type="submit" className="btn btn-primary">
								Create Game
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default CreateGameScreen;
