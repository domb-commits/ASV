(function(){
    if(document.getElementById("custom-floating-menu")) return;

    // =========================================================================
    // MASTER CONFIGURATION: EDIT THIS LIST ON GITHUB TO UPDATE ALL PCs AT ONCE
    // =========================================================================
    const MASTER_PA = [
        { o: "777-0252", d: "112-0030" },
        { o: "102-0026", d: "102-0027" },
        { o: "777-0061", d: "107-0003" },
        { o: "101-0164", d: "101-0154" },
        { o: "102-0035", d: "102-0012" },
        { o: "118-0010", d: "777-0079" },
        { o: "111-0089", d: "111-0016" },
        { o: "118-0011", d: "777-0123" },
        { o: "777-0232", d: "777-0220" },
        { o: "101-0180", d: "101-0181" },
        { o: "777-0160", d: "116-0109" },
        { o: "101-0187", d: "101-0126" },
        { o: "101-0185", d: "101-0039" },
        { o: "117-0079", d: "117-0007" },
        { o: "102-0005", d: "102-0034" },
        { o: "777-0058", d: "211-0012" },
        { o: "202-0627", d: "202-0001" },
        { o: "105-0132", d: "105-0005" },
        { o: "101-0023", d: "101-0173" },
        { o: "102-0036", d: "102-0029" }
    ];
    // =========================================================================

    const s = document.createElement("style");
    s.innerHTML = ".sam-btn{transition:all 0.2s; border:none !important; cursor:pointer; width:100% !important; display:block; text-align:center; box-sizing:border-box;}.sam-active{transform:translateY(2px);filter:brightness(0.9);}.sam-separator{border-top:1px solid #e9ecef;margin:4px 0;width:100%;}#sam-tooltip{position:fixed;background:#2d3436;color:#fff;padding:8px 12px;border-radius:6px;font-size:11px;z-index:2147483647;pointer-events:none;display:none;max-width:220px;box-shadow:0 4px 12px rgba(0,0,0,0.2);line-height:1.4;font-family:sans-serif;} .sam-input{border:1px solid #ced4da; border-radius:4px; padding:8px; font-size:11px; width:100% !important; box-sizing:border-box; background:#fff !important; color:#333 !important;} .sam-input:focus{outline:2px solid #a2c2e8 !important; border-color:transparent !important;}";
    document.head.appendChild(s);

    const q = document.createElement("div");
    q.id = "sam-tooltip";
    document.body.appendChild(q);

    const e = document.createElement("div");
    e.id = "custom-floating-menu";
    e.style.cssText = "position:fixed;top:20px;right:20px;background:#fff;border:1px solid #dee2e6;border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,0.2);z-index:2147483646;display:flex;flex-direction:column;font-family:'Segoe UI',Tahoma,sans-serif;width:260px;min-width:260px;overflow:hidden;user-select:none;";

    const t = document.createElement("div");
    t.style.cssText = "background:#e3f2fd;color:#0d47a1;padding:12px;cursor:move;display:flex;justify-content:space-between;align-items:center;font-size:11px;font-weight:bold;border-bottom:1px solid #d1e3f3;";
    t.innerText = "ASISTENTE DE VALIDACIÓN";

    // SECRET ACTION: Double click the blue header title bar to unlock input editing silently
    t.ondblclick = () => {
        document.querySelectorAll('input[id^="txt_cantidad_qf_"]').forEach(inp => inp.removeAttribute('readonly'));
    };

    const n = document.createElement("span");
    n.innerText = "✕";
    n.style.cssText = "cursor:pointer;padding:0 5px;font-size:14px;";
    n.onclick = () => e.remove();
    t.appendChild(n);
    e.appendChild(t);

    let r = !1, i, l, a, c;
    t.onmousedown = function(t){r=!0,i=t.clientX-e.offsetLeft,l=t.clientY-e.offsetTop};
    document.onmousemove = function(t){if(r){a=t.clientX-i;c=t.clientY-l;e.style.left=a+"px";e.style.top=c+"px";e.style.bottom="auto";e.style.right="auto"}};
    document.onmouseup = () => r = !1;

    const o = document.createElement("div");
    o.style.cssText = "padding:10px;display:flex;flex-direction:column;gap:8px;width:260px;box-sizing:border-box;";
    e.appendChild(o);

    const p = document.createElement("div");
    p.style.cssText = "padding:10px;display:none;flex-direction:column;gap:8px;width:260px;box-sizing:border-box;";

    const prevent = (ev) => {
        ev.stopPropagation();
        if(ev.type==='focusin'||ev.type==='keydown') ev.stopImmediatePropagation();
    };
    document.addEventListener('focusin',(ev)=>{if(ev.target.closest('#custom-floating-menu'))prevent(ev);},true);

    p.innerHTML = `<div style="background:#f8f9fa;color:#495057;padding:8px;margin:-10px -10px 8px -10px;font-size:10px;font-weight:bold;text-align:center;border-bottom:1px solid #eee;">CONFIGURACIÓN CAMBIOS POR PA</div><input id="sam_og" class="sam-input" placeholder="Original (ej. 102-0035)" style="margin-bottom:2px;"><input id="sam_ds" class="sam-input" placeholder="Nuevo (ej. 102-0012)" style="margin-bottom:4px;"><button id="sam_add" style="width:100%;padding:10px;background:#d4edda;color:#155724;border-radius:6px;font-weight:bold;font-size:11px;border:none;cursor:pointer;">AGREGAR CAMBIO LOCAL</button><div style="font-size:10px;font-weight:bold;margin-top:5px;color:#6c757d;">CAMBIOS ACTIVOS:</div><ul id="sam_ul" style="list-style:none;padding:0;margin:0;max-height:140px;overflow-y:auto;background:#fff;border:1px solid #f1f3f5;border-radius:6px;width:100%;"></ul><div style="display:flex;gap:5px;margin-top:5px;"><button id="sam_exp" style="flex:1;padding:6px;background:#e3f2fd;color:#0d47a1;border:none;border-radius:4px;font-size:9px;font-weight:bold;cursor:pointer;">EXPORTAR</button><button id="sam_imp" style="flex:1;padding:6px;background:#fff3cd;color:#856404;border:none;border-radius:4px;font-size:9px;font-weight:bold;cursor:pointer;">IMPORTAR</button></div><button id="sam_back" style="width:100%;margin-top:8px;padding:10px;background:#e9ecef;color:#495057;border-radius:6px;font-weight:bold;font-size:11px;border:none;cursor:pointer;">VOLVER</button>`;
    e.appendChild(p);

    p.querySelectorAll('input').forEach(inp => {
        ['keydown','keyup','keypress','focus','blur'].forEach(t => inp.addEventListener(t,(ev) => ev.stopPropagation(),true))
    });

    function v(e,t,n,o_bold,w,f,h){
        const r = document.createElement("button");
        r.innerText = e;
        r.className = "sam-btn";
        r.style.cssText = `padding:${o_bold?"10px":"8px"};background:${t};color:${f||"#333"};border-radius:8px;font-size:${o_bold?"11px":"10px"};font-weight:${o_bold?"bold":"600"};box-shadow: 0 2px 4px rgba(0,0,0,0.05);`;
        if(h){
            r.onmouseenter = () => {
                q.innerText = h;
                q.style.display = "block";
                const rect = r.getBoundingClientRect();
                q.style.left = (rect.right+12)+"px";
                q.style.top = (rect.top)+"px";
            };
            r.onmouseleave = () => q.style.display = "none";
        }
        r.onmousedown = () => r.classList.add("sam-active");
        r.onmouseup = () => r.classList.remove("sam-active");
        r.onclick = n;
        return r;
    }

    let sw = JSON.parse(localStorage.getItem('sam_sw')||'[]');
    const rs = () => {
        const u = document.getElementById('sam_ul');
        if(!u) return;
        u.innerHTML = '';
        
        if(MASTER_PA.length === 0 && sw.length === 0){
            u.innerHTML = '<li style="padding:10px;font-size:10px;color:#adb5bd;text-align:center;">No hay cambios activos</li>';
            return;
        }

        // Render centralized master list from GitHub
        MASTER_PA.forEach((s) => {
            let li = document.createElement('li');
            li.style.cssText = "display:flex;justify-content:space-between;border-bottom:1px solid #f8f9fa;padding:8px;font-size:10px;align-items:center;width:100%;box-sizing:border-box;background:#f4f9ff;";
            li.innerHTML = `<span style="color:#0d47a1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="Desde GitHub">☁️ <b>${s.o}</b> ➞ <b>${s.d}</b></span><span style="color:#adb5bd;font-size:9px;font-weight:bold;padding:0 6px;">GH</span>`;
            u.appendChild(li);
        });

        // Render local overrides from computer session
        sw.forEach((s,idx) => {
            let li = document.createElement('li');
            li.style.cssText = "display:flex;justify-content:space-between;border-bottom:1px solid #f8f9fa;padding:8px;font-size:10px;align-items:center;width:100%;box-sizing:border-box;";
            li.innerHTML = `<span style="color:#495057;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">💻 <b>${s.o}</b> ➞ <b>${s.d}</b></span><span style="color:#fa5252;cursor:pointer;font-weight:bold;padding:0 6px;" id="sd_${idx}">✕</span>`;
            u.appendChild(li);
            document.getElementById(`sd_${idx}`).onclick = () => {
                sw.splice(idx,1);
                localStorage.setItem('sam_sw',JSON.stringify(sw));
                rs();
            };
        });
    };

    const cp = (t) => {
        if(navigator.clipboard && navigator.clipboard.writeText){
            navigator.clipboard.writeText(t).then(() => alert("Copiado!")).catch(() => {cpF(t)});
        }else{
            cpF(t);
        }
    };

    const cpF = (t) => {
        const ta = document.createElement("textarea");
        ta.value = t;
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand('copy');
            alert("Código de sincronización copiado (Fallback).");
        } catch(err) {
            alert("Error al copiar.");
        }
        document.body.removeChild(ta);
    };

    setTimeout(() => {
        document.getElementById('sam_add').onclick = () => {
            let o_v = document.getElementById('sam_og').value.trim(), d_v = document.getElementById('sam_ds').value.trim();
            if(o_v && d_v){
                sw.push({o:o_v,d:d_v});
                localStorage.setItem('sam_sw',JSON.stringify(sw));
                document.getElementById('sam_og').value = '';
                document.getElementById('sam_ds').value = '';
                rs();
            }
        };
        document.getElementById('sam_back').onclick = () => { p.style.display = "none"; o.style.display = "flex"; };
        document.getElementById('sam_exp').onclick = () => { cp(btoa(JSON.stringify(sw))); };
        document.getElementById('sam_imp').onclick = () => {
            const code = prompt("Pegue el código de sincronización aquí:");
            if(code){
                try {
                    const data = JSON.parse(atob(code));
                    if(Array.isArray(data)){
                        sw = data;
                        localStorage.setItem('sam_sw',JSON.stringify(sw));
                        rs();
                        alert("Sincronización exitosa.");
                    }
                } catch(err) {
                    alert("Código inválido.");
                }
            }
        };
        rs();
    },100);

    const as = () => {
        const total_sw = [...MASTER_PA, ...sw];
        if(!total_sw.length) return;
        document.querySelectorAll('select[id^="cbo_farmaco_"]').forEach(sel => {
            let t = sel.options[sel.selectedIndex]?.text||"", v = sel.value||"";
            let m = total_sw.find(s => t.includes(s.o)||v.includes(s.o));
            if(m){
                let opt = Array.from(sel.options).find(opt => opt.text.includes(m.d)||opt.value.includes(m.d));
                if(opt){
                    sel.value = opt.value;
                    if(window.jQuery) jQuery(sel).trigger('change');
                }else{
                    let no = new Option(m.d,m.d,!0,!0);
                    sel.appendChild(no);
                    if(window.jQuery) jQuery(sel).trigger('change');
                }
            }
        });
    };

    const m_as = () => {
        const total_sw = [...MASTER_PA, ...sw];
        if(!total_sw.length){ alert("No hay cambios configurados."); return; }
        let c = 0;
        document.querySelectorAll('select[id^="cbo_farmaco_"]').forEach(sel => {
            let t = sel.options[sel.selectedIndex]?.text||"", v = sel.value||"";
            let m = total_sw.find(s => t.includes(s.o)||v.includes(s.o));
            if(m){
                let opt = Array.from(sel.options).find(opt => opt.text.includes(m.d)||opt.value.includes(m.d));
                if(opt){
                    sel.value = opt.value;
                    if(window.jQuery) jQuery(sel).trigger('change');
                    c++;
                }else{
                    let no = new Option(m.d,m.d,!0,!0);
                    sel.appendChild(no);
                    if(window.jQuery) jQuery(sel).trigger('change');
                    c++;
                }
            }
        });
        alert(`Se aplicaron ${c} cambios por PA.`);
    };

    let m_idx = -1;
    o.appendChild(v("SIGUIENTE RECETA (↑)","#e3f2fd",function(){const e=document.querySelectorAll("#tbl_resultado tbody tr");let f=!1,n=(m_idx===-1)?e.length-1:m_idx-1;for(let r=n;r>=0;r--){const i=e[r].cells[2]?e[r].cells[2].innerText.trim():"",o_btn=e[r].querySelector('[onclick^="verDetalle"]');if(o_btn&&i==="EMITIDA"){m_idx=r;o_btn.click();f=!0;break}}if(!f){alert("Inicio de lista alcanzado.");m_idx=-1}},!0,null,"#0d47a1","Busca la siguiente receta emitida hacia arriba"));

    // Function to handle value overrides based on base multiplier and error correction
    const multi = (t) => {
        if(window._origVal) jQuery.fn.val = window._origVal;
        window._origVal = jQuery.fn.val;
        jQuery.fn.val = function(e){
            if(arguments.length > 0 && this.hasClass("class_valida") && !isNaN(parseFloat(e))){
                let baseVal = parseFloat(e);
                
                // Divides values over 1000 by 100, defaults to 1 if it falls between 100 and 1000
                if (baseVal >= 1000) {
                    baseVal = Math.ceil(baseVal / 1000);
                } else if (baseVal >= 100) {
                    baseVal = 1;
                }
                
                return window._origVal.call(this, Math.round(baseVal * t));
            }
            return window._origVal.apply(this,arguments);
        };
        document.querySelectorAll('[onclick*="txt_cantidad_qf_"]').forEach((e => {
            try { new Function(e.getAttribute('onclick'))(); } catch(err) {}
        }));
        setTimeout(() => { jQuery.fn.val = window._origVal; delete window._origVal; }, 100);
    };

    o.appendChild(v("VALIDAR SUGERIDA","#f1f3f5",()=>multi(1),!1,null,"#495057","Copia la cantidad sugerida a la validada"));

    const rowM = document.createElement("div");
    rowM.style.cssText = "display:flex;gap:6px;width:100%;";
    rowM.appendChild(v("X 2D","#f8f9fa",()=>multi(2),!1,"1","#495057","Multiplica dosis sugerida por 2"));
    rowM.appendChild(v("X 3D","#f8f9fa",()=>multi(3),!1,"1","#495057","Multiplica dosis sugerida por 3"));
    rowM.appendChild(v("X 4D","#f8f9fa",()=>multi(4),!1,"1","#495057","Multiplica dosis sugerida por 4"));
    o.appendChild(rowM);

    o.appendChild(v("VALIDAR Y CERRAR","#d4edda",async()=>{as();const e=document.getElementById("btn_validar_receta");if(e){e.click();await new Promise(r=>setTimeout(r,500));const t=document.querySelector(".swal2-confirm");if(t)t.click();await new Promise(r=>setTimeout(r,400));const n=document.querySelector('.btn-close[data-bs-dismiss=\"modal\"]');if(n)n.click()}},!0,null,"#155724","Aplica cambios PA, valida y cierra la ventana"));
    o.appendChild(v("VALIDAR URGENCIAS","#d1ecf1",async()=>{as();const b=document.getElementById("bodega_hospitalizado");if(b){b.value="90";if(typeof seleccionarBodega==="function")seleccionarBodega("90");if(window.jQuery)jQuery(b).trigger("change")}await new Promise(r=>setTimeout(r,400));const e=document.getElementById("btn_validar_receta");if(e){e.click();await new Promise(r=>setTimeout(r,500));const t=document.querySelector(".swal2-confirm");if(t)t.click()}},!0,null,"#0c5460","Cambia a Bodega 90 y valida"));
    o.appendChild(v("ENTREGAR Y CERRAR","#c3e6cb",async()=>{const sel=document.getElementById("cbo_receta_estado");if(sel){sel.value="3";if(window.jQuery)jQuery(sel).trigger("change")}await new Promise(r=>setTimeout(r,400));const e=document.getElementById("btn_entregar_receta");if(e){e.click();await new Promise(r=>setTimeout(r,1200));const t=document.querySelector(".swal2-confirm");if(t)t.click();await new Promise(r=>setTimeout(r,1000));const n=document.querySelector('.btn-close[data-bs-dismiss=\"modal\"]');if(n)n.click()}},!0,null,"#1b5e20","Cambia a estado entrega total y finaliza"));
    o.appendChild(v("LIMPIAR ENTREGAS (0)","#fff3cd",()=>{document.querySelectorAll('input').forEach(e=>{if(/^txt_lote_cantidad_\d+_\d+$/.test(e.id)){e.value="0";if(window.jQuery)jQuery(e).trigger("change");}})},!1,null,"#856404","Deja todas las cantidades de entrega en 0"));

    o.appendChild(v("DESVALIDAR TODO","#f8f9fa",async()=>{const e=document.querySelectorAll('[onclick^="desvalidar_fila"]');if(0===e.length||!confirm(`¿Desvalidar ${e.length} ítems?`))return;const t=document.createElement("div");t.innerHTML='<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,0.8);backdrop-filter:blur(4px);color:#333;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999999;"><h3>Procesando...</h3><p>Item <span id="b-cnt">0</span> de '+e.length+"</p></div>",document.body.appendChild(t);const o_form=document.getElementById("guardarRecetaHospitalizado");let r_ajax;for(let i=0;i<e.length;i++){const l=e[i].getAttribute("onclick").match(/\d+/);if(!l)continue;const a=new FormData(o_form);a.set("modo","3");a.set("txt_safat038",l[0]);try{r_ajax=await jQuery.ajax({url:"receta501.php",type:"post",data:a,cache:!1,contentType:!1,processData:!1,dataType:"html"});document.getElementById("b-cnt").innerText=i+1}catch(err){}}t.remove();if(r_ajax){jQuery("#div_resultado").html(r_ajax)}},!1,null,"#6c757d","Elimina todas las validaciones actuales"));
    o.appendChild(v("DESVALIDAR SELECCIONADOS","#f8f9fa",async()=>{const checkedCBs=document.querySelectorAll('.sam-row-cb:checked');const e=Array.from(checkedCBs).map(cb=>cb.closest('tr').querySelector('[onclick^="desvalidar_fila"]')).filter(Boolean);if(0===e.length){alert("No hay ítems seleccionados.");return;}if(!confirm(`¿Desvalidar ${e.length} ítems seleccionados?`))return;const t=document.createElement("div");t.innerHTML='<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,0.8);backdrop-filter:blur(4px);color:#333;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999999;"><h3>Procesando...</h3><p>Item <span id="b-cnt">0</span> de '+e.length+"</p></div>",document.body.appendChild(t);const o_form=document.getElementById("guardarRecetaHospitalizado");let r_ajax;for(let i=0;i<e.length;i++){const l=e[i].getAttribute("onclick").match(/\d+/);if(!l)continue;const a=new FormData(o_form);a.set("modo","3");a.set("txt_safat038",l[0]);try{r_ajax=await jQuery.ajax({url:"receta501.php",type:"post",data:a,cache:!1,contentType:!1,processData:!1,dataType:"html"});document.getElementById("b-cnt").innerText=i+1}catch(err){}}t.remove();if(r_ajax){jQuery("#div_resultado").html(r_ajax)}},!1,null,"#6c757d","Elimina solo las validaciones marcadas con el checkbox"));

    const rowR = document.createElement("div");
    rowR.style.cssText = "display:flex;gap:6px;width:100%;";
    rowR.appendChild(v("RECHAZAR (DUP)","#f8d7da",()=>rej(4,"Duplicada",!0),!1,"1","#721c24","Rechazo rápido por duplicidad"));
    rowR.appendChild(v("RECHAZAR (EXP)","#fff3cd",()=>rej(10,"Vigencia expirada",!0),!1,"1","#856404","Rechazo rápido por receta expirada"));
    o.appendChild(rowR);
    o.appendChild(v("REABRIR PARA EDITAR","#e2e3e5",()=>rej(1,"Reapertura por corrección",!1),!1,null,"#383d41","Reabre la receta sin cerrar la ventana"));

    const sep = document.createElement("div");
    sep.className = "sam-separator";
    o.appendChild(sep);

    o.appendChild(v("FIX STOCK NEGATIVO","#fde2e4",()=>{var h=document.querySelectorAll('input[type=\"hidden\"][id^=\"txt_disponible_\"]');var count=0;h.forEach(function(i){var v=parseFloat(i.value);if(!isNaN(v)&&v<0){i.value=Math.abs(v);count++}});if(count>0)alert('Corregidos '+count+' negativos.');else alert('No hay negativos.')},!1,null,"#a35a5a","Convierte stock negativo en positivo"));

    const rowC = document.createElement("div");
    rowC.style.cssText = "display:flex;gap:6px;width:100%;margin-top:4px;";
    rowC.appendChild(v("⚙️ CONFIG PA","#e3f2fd",()=>{o.style.display="none";p.style.display="flex";rs();},!1,"1","#0d47a1","Configuración de cambios automáticos por PA"));
    rowC.appendChild(v("🔄 APLICAR PA","#d1ecf1",m_as,!1,"1","#0c5460","Ejecuta los cambios configurados ahora"));
    o.appendChild(rowC);

    document.body.appendChild(e);

    const rej = async(c,m,ac) => {
        const f = () => {
            const b = Array.from(document.querySelectorAll('a.dropdown-item')).find(a=>a.getAttribute('onclick')?.includes('rechazar('+c+')'));
            if(b){ b.click(); return !0; }
            if(typeof rechazar==='function'){ rechazar(c); return !0; }
            return !1;
        };
        if(f()){
            let a = 0;
            const i = setInterval(async()=>{
                const t = document.getElementById("txa_motivo"), s = document.getElementById("cbo_accion");
                if(t && s){
                    clearInterval(i);
                    s.value = c.toString();
                    if(window.jQuery) jQuery(s).trigger("change");
                    t.value = m;
                    if(typeof validar_receta506==='function'){
                        validar_receta506();
                        await new Promise(r=>setTimeout(r,800));
                        const confirm_btn = document.querySelector(".swal2-confirm");
                        if(confirm_btn) confirm_btn.click();
                        if(ac){
                            await new Promise(r=>setTimeout(r,600));
                            const cl = document.querySelector('.btn-close[data-bs-dismiss=\"modal\"]');
                            if(cl) cl.click();
                        }
                    }
                }
                if(++a>20) clearInterval(i);
            },100);
        } else alert("Error al abrir rechazo.");
    };

    setInterval(() => {
        document.querySelectorAll('[onclick^="desvalidar_fila"]').forEach(btn => {
            const tr = btn.closest('tr');
            if(tr && !tr.querySelector('.sam-row-cb')){
                const table = tr.closest('table');
                if(table){
                    const theadTr = table.querySelector('thead tr');
                    if(theadTr && !theadTr.querySelector('.sam-th-cb')){
                        const th = document.createElement('th');
                        th.className = 'sam-th-cb';
                        th.innerText = 'Sel.';
                        th.style.cssText = 'text-align:center;width:40px;';
                        theadTr.appendChild(th);
                    }
                }
                const td = document.createElement('td');
                td.style.cssText = 'text-align:center;vertical-align:middle;';
                td.innerHTML = '<input type="checkbox" class="sam-row-cb" style="width:16px;height:16px;cursor:pointer;">';
                tr.appendChild(td);
            }
        });
    }, 1000);
})();
