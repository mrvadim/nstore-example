CREATE TABLE logs (
	ts_event TIMESTAMPTZ default CURRENT_TIMESTAMP,
	source_data VARCHAR(50),
	event_data VARCHAR(200)
);