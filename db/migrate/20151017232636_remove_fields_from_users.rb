class RemoveFieldsFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :firstname, :string
    remove_column :users, :lastname, :string
  end
end
