class AuthController < ApplicationController
	# requires authorization before action

	before_action :authenticate_user!
end