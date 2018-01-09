import React from 'react';
import _ from 'lodash';
import ComponentDoc from './ComponentDoc';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentComponent: props.currentComponent,
		};
	}

	handleSelectComponent(componentManifestName) {
		return () => {
			this.setState({
				currentComponent: componentManifestName,
			})
		};
	}

	render() {
		const {
			componentManifests,
		} = this.props;

		const {
			currentComponent,
		} = this.state;

		return (
			<div className='rms-App'>
				<div className='component-list'>
					{/*
					<h1>Components</h1>
					<div><a href="/manifest">manifest</a></div>
					*/}
					<div><a href='javascript:;' onClick={this.handleSelectComponent(null)}>Home</a></div>
					<hr />
					{componentManifests.map((componentManifest, index) => (
						<div key={index}>
							<a
								className={componentManifest.manifestName === currentComponent ? 'current-component' : null}
								href='javascript:;'
								onClick={this.handleSelectComponent(componentManifest.manifestName)}
							>
								{componentManifest.manifestName}
							</a>
						</div>
					))}
				</div>
				<div className='component-details'>
					{currentComponent ? (
						<ComponentDoc manifest={_.find(componentManifests, {manifestName: currentComponent})} /> 
					) : (
						<section>
							<h1>Welcome to the Component docs!</h1>
							<p>
								this is the home page...
							</p>
						</section>
					)}
				</div>
			</div>
		);
	}
}

export default App;
