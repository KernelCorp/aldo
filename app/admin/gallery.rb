ActiveAdmin.register Gallery do
  index do
    column :title do |gallery|
      link_to gallery.title, admin_gallery_path(gallery)
    end
    default_actions
  end

  form do |f|
    f.inputs do
      f.has_many :images, :allow_destroy => true do |cf|
        cf.input :path
      end
    end
    f.actions
  end

  show do
    render partial: "show", locals: { gallery: gallery }
  end
end
