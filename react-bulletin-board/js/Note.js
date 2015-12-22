var Note = React.createClass({
	getInitialState: function () {
		return {editing: false};
	},
	create: function() {
		alert('creating new note');
	},
	edit: function() {
		this.setState({editing: true});
	},
	save: function() {
		// supposedly React getDOMNode has been deprecated in favor of ReactDOM.FindDOMNode
		// but that isn't working either
		this.props.onChange(this.refs.newText.getDOMNode().value, this.props.index);
		this.setState({editing: false});
	},
	remove: function() {
		this.props.onRemove(this.props.index);
	},
	renderDisplay: function() {
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
	},
	renderForm: function() {
		return (
			<div className="note">
				<textarea ref="newText" defaultValue={this.props.children} className="form-control"></textarea>
				<button onClick={this.save} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
			</div>
			);
	},
	render: function() {
		if (this.state.editing) {
			return this.renderForm();
		} else {
			return this.renderDisplay();
		}
	}
});

var Board = React.createClass({
	// propTypes from react library, helps handle validation
	propTypes: {
		count: function(props, propName) {
			if (typeof props[propName] !== "number") {
				return new Error('The count property must be a number');
			}
			if (props[propName] > 100) {
				return new Error("creating " + props[propName] + " notes is ridiculous");
			}
		}
	},
	// return a list of notes
	// getInitialState makes whatever is returned a property of this.state
	getInitialState: function () {
		return {
			notes: [
				'call bill', 
				'do that thing',
				'wash dishes',
				'do another thing'
			]
		};
	},
	// stores state of notes
	update: function(newText, i) {
		// get local copy of notes array stored on state
		var arr = this.state.notes;
		// update new text in local array of notes
		arr[i] = newText;
		// updates the property notes on state with our updated local arr
		this.setState({notes: arr});
	},
	remove: function(i) {
		var arr = this.state.notes;
		arr.splice(i, 1);
		this.setState({notes:arr});
	},
	// change where rendering note, simplifies render
	eachNote: function(note, i) {
		return (
			<Note key={i}
				index={i}
				onChange={this.update}
				onRemove={this.remove}
			>{note}</Note>
			);
	},
	render: function() {
		// map is usual javascript function
		// heavy lifting of attaching things to Note is done in eachNote
		return (<div className="board">
					{this.state.notes.map(this.eachNote)}
				</div>
			);
	}
});

React.render(<Board count={10} />, 
	document.getElementById("react-container")
	);