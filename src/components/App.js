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

	handleSelectComponent(componentBaseName) {
		return () => {
			this.setState({
				currentComponent: componentBaseName,
			})
		};
	}

	render() {
		const {
			componentDataList,
		} = this.props;

		const {
			currentComponent,
		} = this.state;

		return (
			<div className='rms-App'>
				<div className='component-list'>
					<div><a href='javascript:;' onClick={this.handleSelectComponent(null)}>Home</a></div>
					<hr />
					{componentDataList.map((componentData, index) => (
						<div key={index}>
							<a
								className={componentData.baseName === currentComponent ? 'current-component' : null}
								href='javascript:;'
								onClick={this.handleSelectComponent(componentData.baseName)}
							>
								{componentData.baseName}
							</a>
						</div>
					))}
				</div>
				<div className='component-details'>
					{currentComponent ? (
						<ComponentDoc componentData={_.find(componentDataList, {baseName: currentComponent})} /> 
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
