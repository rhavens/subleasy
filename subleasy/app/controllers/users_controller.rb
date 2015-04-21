class UsersController < ApplicationController
	add_breadcrumb :index, :user_path

	def show
		@user = User.find(params[:id])
		add_breadcrumb @user.id, offer_path(@user)
	end
end
