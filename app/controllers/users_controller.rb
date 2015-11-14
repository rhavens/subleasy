class UsersController < AuthController

	def show
		@user = User.find(params[:id])
	end
end
