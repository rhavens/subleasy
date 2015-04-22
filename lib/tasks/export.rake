namespace :export do
  desc "Prints Offer.all in a seeds.rb way."
  task :seeds_format => :environment do
    Offer.order(:id).all.each do |country|
      puts "Offer.create(#{country.serializable_hash.delete_if {|key, value| ['created_at','updated_at','id'].include?(key)}.to_s.gsub(/[{}]/,'')})"
    end
    User.order(:id).all.each do |country|
      puts "User.create(#{country.serializable_hash.delete_if {|key, value| ['created_at','updated_at','id'].include?(key)}.to_s.gsub(/[{}]/,'')})"
    end
  end
end