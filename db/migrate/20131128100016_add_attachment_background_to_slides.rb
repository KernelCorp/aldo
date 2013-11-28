class AddAttachmentBackgroundToSlides < ActiveRecord::Migration
  def self.up
    change_table :slides do |t|
      t.attachment :background
    end
  end

  def self.down
    drop_attached_file :slides, :background
  end
end
