import React from 'react';
import _ from 'lodash';

class ComponentDoc extends React.Component {

	render() {
		const {
			componentData,
		} = this.props;

		return (
			<section className='rms-ComponentDoc'>
				<h1 className='rms-ComponentDoc-title'>{componentData.baseName}</h1>
				<p>{componentData.description}</p>
				<table className='rms-ComponentDoc-propTypes'>
					<thead>
						<tr>
							<th>propName</th>
							<th>type</th>
							<th>args</th>
							<th>default</th>
							<th>isRequired</th>
							<th>description</th>
						</tr>
					</thead>
					<tbody>
					{_.map(componentData.propTypes, (propType, propName) => (
						<tr key={`${componentData.baseName}-${propName}`}>
							<td>{propName}</td>
							<td>{propType.type}</td>
							<td>{JSON.stringify(propType.args)}</td>
							<td>{JSON.stringify(propType.default)}</td>
							<td>{propType.isRequired && 'required'}</td>
							<td>{propType.text}</td>
						</tr>
					))}
					</tbody>
				</table>
				<pre>{JSON.stringify(componentData, null, 2)}</pre>
			</section>
		);
	}
}

export default ComponentDoc;
