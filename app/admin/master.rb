ActiveAdmin.register Master do
  config.filters = false

  index do
    column :id
    column :fio
    default_actions
  end
  
  form do |f|
    f.inputs do
      f.input :fio
      f.input :biography
      f.input :photo, as: :file

      f.input :services, as: :check_boxes, collection: Service.all
    end
    f.actions
  end

  show do
    render partial: 'show', locals: { master: master }
  end

end
