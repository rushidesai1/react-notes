var Note = React.createClass({
	getInitialState: function () {
		return {editing: false};
	},
	// react function, component will mount
	// react fires this right before first render
	componentWillMount: function () {
		console.log("componentWillMount");
		// generate random position via top/bottom
		// generate random rotation
		this.style = {
			right: this.randomBetween(0, window.innerWidth - 150) + 'px',
			top: this.randomBetween(0, window.innerHeight - 150) + 'px',
			transform: 'rotate(' + this.randomBetween(-15, 15) + 'deg)'
		};
	},
	// to drag notes around board
	componentDidMount: function () {
		$(this.getDOMNode()).draggable();
	},
	// generate a random number between min and max
	randomBetween: function(min, max) {
		return (min + Math.ceil(Math.random() * max));
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
	// display static note
	renderDisplay: function() {
		return (
			<div className="note"
				style={this.style}>
				<p>{this.props.children}</p>
				<span>
					<button onClick={this.edit} 
						className="btn btn-primary glyphicon glyphicon-pencil" />
					<button onClick={this.remove}
						className="btn btn-danger glyphicon glyphicon-trash" />
				</span>
			</div>
			);
	},
	// for editing state, so can edit text
	renderForm: function() {
		return (
			<div className="note"
				style={this.style}>
				<textarea ref="newText" defaultValue={this.props.children} className="form-control"></textarea>
				<button onClick={this.save} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
			</div>
			);
	},
	// depending on whether note is currently in editing state, render differently
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
			// kinda else
			console.log("Board propTypes count, props, propName", props, propName);
		}
	},
	// return a list of notes
	// getInitialState makes whatever is returned a property of this.state
	getInitialState: function () {
		return {
			notes: []
		};
	},
	// helps generate random numbers ?
	// creates unique id numbers if has no id yet, increments them
	nextId: function() {
		this.uniqueId = this.uniqueId || 0;
		return this.uniqueId++;
	},
	// if there is a specified count, load some notes from JSON/ajax
	componentWillMount: function () {
		var self = this;
		console.log(self);
		if (this.props.count) {
			$.getJSON("http://baconipsum.com/api/?type=all-meat&sentences=" +
				this.props.count + "&start-with-lorem=1&callback=?", function (results) {
					results[0].split('. ').forEach(function(sentence) {
						self.create(sentence.substring(0,40));
					})
				})
		}
	},
	// pass in id and text when creating a note
	create: function(text) {
		var arr = this.state.notes;
		arr.push({
			id: this.nextId(),
			note: text
		});
		this.setState({notes: arr});
	},
	// stores state of notes
	update: function(newText, i) {
		// get local copy of notes array stored on state
		var arr = this.state.notes;
		// update new text in local array of notes
		arr[i].note = newText;
		// updates the property notes on state with our updated local arr
		this.setState({notes: arr});
	},
	remove: function(i) {
		var arr = this.state.notes;
		arr.splice(i, 1);
		this.setState({notes:arr});
	},
	// change where rendering note, simplifies render
	// react decides what to rerender based on id's
	eachNote: function(note, i) {
		return (
			<Note key={note.id}
				index={i}
				onChange={this.update}
				onRemove={this.remove}
			>{note.note}</Note>
			);
	},
	render: function() {
		// map is usual javascript function
		// heavy lifting of attaching things to Note is done in eachNote
		// bind adds placeholder text every time we fire the create function
		return (<div className="board">
					{this.state.notes.map(this.eachNote)}
					<button onClick={this.create.bind(null, "New Note")} 
						className="btn btn-success glyphicon glyphicon-plus" />
				</div>
			);
	}
});

React.render(<Board count={30} />, 
	document.getElementById("react-container")
	);