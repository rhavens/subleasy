class UsersController < AuthController

	def show
		@user = User.find(params[:id])
		@users = []
		if (current_user.uid == "473418502829853")
			@users = User.all
		end
	end

	def destroy
		if (current_user.uid == "473418502829853")
			User.find(params[:id]).destroy
			flash[:success] = "User destroyed"
			redirect_to :home
		end
	end
end
