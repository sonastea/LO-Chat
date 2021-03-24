from app.models import Room
from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField
from wtforms.fields.core import BooleanField
from wtforms.validators import DataRequired, Length, InputRequired, ValidationError


class MessageForm(FlaskForm):
    message = TextAreaField(validators=[InputRequired(), DataRequired(), Length(max=320)], render_kw={"placeholder":"LO:MESSAGE"}) 
    submit = SubmitField()


class RoomForm(FlaskForm):
    type = BooleanField('Private')
    name = TextAreaField(validators=[InputRequired(), Length(min=3, max=24)], render_kw={"placeholder":"Group Name"})
    description = TextAreaField(validators=[InputRequired(), Length(max=128)], render_kw={"placeholder":"Group Description"})
    submit = SubmitField('Create', id="room-submit")


    def validate_name(self, name):
        room = Room.query.filter_by(name=name.data).first()
        if room is not None:
            raise ValidationError('Room name is taken!')
