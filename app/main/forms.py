from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length, InputRequired


class MessageForm(FlaskForm):
    message = TextAreaField(validators=[InputRequired(), DataRequired(), Length(max=320)], render_kw={"placeholder":"LO:MESSAGE"}) 
    submit = SubmitField()
