import { useContext, useEffect } from 'react';
import { LIBELLE } from '../../constantes/homepage.constantes.Js';
import { GlobalContext } from '../../contexts/GlobalContext';

export default function Homepage() {

    const { fullFilmList, setFullFilmList } = useContext(GlobalContext);

    useEffect(() => {
        
    }, []);

    return (
        <div class="container">
            <div class="row mt-5 d-flex justify-content-center">
                <h1 class="col-3">{LIBELLE.TITLE}</h1>
            </div>
            <div>
                <form method="post" action="<%= `/${VIEW_LIBELLE.HOMEPAGE}` %>" class="row">
                    <div class="col-4 mb-3">
                        <label for="title" class="form-label ms-2">{LIBELLE.SEARCH.TITLE}</label>
                        <input type="text" class="form-control" id="title" name="title" placeholder={LIBELLE.SEARCH.PLACEHOLDER} />
                    </div>
                    <div class="col-1 mt-3">
                        <button type="submit" class="btn btn-primary mt-3"><i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </form>
            </div>
            {"<% if(films.length> 0) { %>"}
    {"<% - include('partials/film-card') %>"}
    {"<% } %>"}
           { "<% if(error) { %>"}
    <div class="row mt-5">
      <p>
        {'<%= error %>'}
      </p>
    </div>
    {'<% } %>'}
        </div>
    );
}