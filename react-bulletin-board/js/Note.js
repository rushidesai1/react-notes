var Note = React.createClass({
	create: function() {
		alert('creating new note');
	},
	edit: function() {
		alert('editing note');
	},
	remove: function() {
		alert('remove note');
	},
	render: function() {
		return (
			<div className="note">
				<p>{this.props.children}</p>
				<span>
					<button onClick={this.create} 
						className="btn btn-success glyphicon glyphicon-plus" />
					<button onClick={this.edit} 
						className="btn btn-primary glyphicon glyphicon-pencil" />
					<button onClick={this.remove}
						className="btn btn-danger glyphicon glyphicon-trash" />
				</span>
			</div>
			);
	}
});

React.render(<div><Note>Hello World</Note><Note>See ya later World</Note><Note>After while crocodile</Note></div>, document.getElementById("react-container"));