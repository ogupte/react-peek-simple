import React from 'react';
import _ from 'lodash';

class ComponentDoc extends React.Component {

	render() {
		const {
			manifest,
		} = this.props;

		return (
			<section className='rms-ComponentDoc'>
				<h1 className='rms-ComponentDoc-title'>{manifest.manifestName}</h1>
				<p>{manifest.description}</p>
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
					{_.map(manifest.propTypes, (propType, propName) => (
						<tr key={`${manifest.manifestName}-${propName}`}>
							<td>{propName}</td>
							<td>{propType.type}</td>
							<td>{JSON.stringify(propType.args)}</td>
							<td>{JSON.stringify(propType.default)}</td>
							<td>{propType.isRequired && 'required'}</td>
							<td>{propType.description}</td>
						</tr>
					))}
					</tbody>
				</table>
				<pre>{JSON.stringify(manifest, null, 2)}</pre>
			</section>
		);
	}
}

export default ComponentDoc;
