// Data
var data = [
	{
		author: "Pete Hunt",
		text: "Comment **bold**."
	},
	{
		author: "Jordan Walke",
		text: "Comment *italic*."
	}
];



// Components
var CommentBox = React.createClass({
	loadCommentsFromServer: function() {
		$.ajax({
			url: this.props.url,
			dataType: "json",
			cache: false,
			success: function(obj) {
				this.setState({data: obj});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {data: [ ]};
	},
	componentDidMount: function() {
		this.loadCommentsFromServer();
		setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	},
	render: function() {
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList data={this.state.data} />
				<CommentForm />
			</div>
		);
	}
});

var CommentList = React.createClass({
	render: function() {
		var commentNodes = this.props.data.map(function(comment) {
			return (
				<Comment author={comment.author}>
					{comment.text}
				</Comment>
			);
		});
		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
});

var CommentForm = React.createClass({
	render: function() {
		return (
			<div className="commentForm">
				I am a CommentForm.
			</div>
		);
	}
});

var Comment = React.createClass({
	render: function() {
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				{marked(this.props.children.toString(), {sanitize: true})}
			</div>
		);
	}
});



React.render(
	<CommentBox url="comments.json" pollInterval={2000} />,
	document.getElementById("content")
);