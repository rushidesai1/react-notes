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